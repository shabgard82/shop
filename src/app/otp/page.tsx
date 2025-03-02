"use client";

import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import { useState, useRef } from "react";

export default function OTPInput() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const router = useRouter();
  const [association, setAssociation] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // فقط عدد وارد شود

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // اگر مقدار وارد شد، به بعدی برو
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  async function handleSubmitOtp() {
    try {
      const phoneNumber = getCookie("phone_number");
      const otpCode = otp.join("");
      const otpNumber = parseInt(otpCode, 10);
      console.log(otpNumber, typeof otpNumber);
      const response = await fetch(
        "http://192.168.100.21:8000/api/v2/accounts/auth/otp/confirm/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone_number: phoneNumber,
            code: otpNumber,
            is_association: association,
          }),
        }
      );

      let data;
      const text = await response.text();

      if (text) {
        data = JSON.parse(text);
      } else {
        data = {};
      }

      console.log("Response:", data);

      if (response.ok) {
        const token = data.token;
        const expireAt = data.expire_at;
        const expireDate = new Date(expireAt * 1000);
        console.log("Received Token:", token);
        setCookie("auth_token", token, {
          expires: expireDate,
          path: "/",
          // httpOnly: true,
        });

        router.push("/");
        alert("اوکی ✅");
      } else {
        throw new Error(data.message || "خطا در ارسال درخواست");
      }
    } catch (error: unknown) {
      console.error("Error:", error);
      if (error instanceof Error) {
        alert("خطایی رخ داد: " + error.message);
      } else {
        alert("خطایی رخ داد");
      }
    }
  }

  return (
    <div className="flex flex-col mx-auto my-4">
      <div className="flex justify-center my-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                setAssociation(e.target.checked);
                console.log(e.target.checked);
              } else {
                setAssociation(false);
              }
            }}
            checked={association}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>مجموعه</span>
        </label>
      </div>
      <div className="flex justify-center gap-2">
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 text-center border border-gray-400 rounded-lg text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>
      <div className="flex justify-center my-2" onClick={handleSubmitOtp}>
        <button className="bg-blue-500 px-2 py-1 rounded-md text-white w-80">
          تایید کد یکبار مصرف
        </button>
      </div>
    </div>
  );
}
