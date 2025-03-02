"use client";
import { useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const submitForm = async () => {
    if (!phoneNumber.trim()) {
      alert("لطفاً شماره تلفن را وارد کنید!");
      return;
    }

    try {
      const response = await fetch(
        "http://192.168.100.21:8000/api/v2/accounts/auth/otp/sms/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone_number: phoneNumber }),
        }
      );

      let data;
      const text = await response.text();

      if (text) {
        data = JSON.parse(text);
      } else {
        data = {};
      }

      if (response.ok) {
        setCookie("phone_number", phoneNumber, { maxAge: 600 });
        alert("اوکی ✅");
        router.push("/otp");
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
  };

  return (
    <div className="bg-red-500 p-4 flex flex-col gap-2">
      <input
        type="text"
        value={phoneNumber}
        onChange={handleChange}
        placeholder="+98798776766"
        className="p-2 border rounded"
      />
      <button
        onClick={submitForm}
        className="p-2 bg-blue-500 text-white rounded"
      >
        تایید
      </button>
    </div>
  );
}
