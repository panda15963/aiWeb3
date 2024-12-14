import { useEffect, useState } from "react";
import Navbar from "../navbar";
import Footer from "../Footer";
import { getEditFee } from "@/utils/payment1"; // 수수료 조회 함수 가져오기
import styles from "./pricing.module.css";

// Pricing 관련 인터페이스 정의
export interface PricingTierFrequency {
  id: string;
  value: string;
  label: string;
}

export interface PricingTier {
  name: string;
  id: string;
  href: string;
  price: string | Record<string, string>;
  description: string | React.ReactNode;
  features: string[];
  featured?: boolean;
  highlighted?: boolean;
  soldOut?: boolean;
}

// 초기 데이터
export const frequencies: PricingTierFrequency[] = [
  { id: "1", value: "1", label: "Every Time" },
];

export const initialTiers: PricingTier[] = [
  {
    name: "Text-to-Image",
    id: "0",
    href: "../generationTools/text_to_image",
    price: { "1": "Loading..." },
    description: `Input text, get an image you want.`,
    features: [
      `Simple, easy-to-use interface`,
      `Text-to-image generation`,
      `Generation of images from text descriptions`,
    ],
    featured: true,
    highlighted: true,
  },
  {
    name: "Image to Image",
    id: "1",
    href: "../generationTools/image_to_image",
    price: { "1": "Loading..." },
    description: `Input image, get an image you want.`,
    features: [
      `Simple, easy-to-use interface`,
      `Image-to-image generation`,
      `Generation of images from images`,
    ],
    featured: true,
  },
  {
    name: "Multi-Promping",
    id: "2",
    href: "../generationTools/multi_promping",
    price: { "1": "Loading..." },
    description: `Input multiple texts, get an image you want.`,
    features: [
      `Simple, easy-to-use interface`,
      `Multi-promping generation`,
      `Generation of images from multiple texts`,
    ],
    featured: true,
  },
];

// CheckIcon 컴포넌트
const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`w-6 h-6 ${className}`}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default function PricingPage() {
  const [frequency, setFrequency] = useState(frequencies[0]);
  const [tiers, setTiers] = useState<PricingTier[]>(initialTiers);

  // 수수료 조회 및 업데이트
  useEffect(() => {
    const fetchEditFee = async () => {
      try {
        const fee = await getEditFee(); // 수수료 값 가져오기
        setTiers((prevTiers) =>
          prevTiers.map((tier) => ({
            ...tier,
            price: { "1": `${fee} MODIM` }, // 가격 동적 설정
          }))
        );
      } catch (error) {
        console.error("Failed to fetch edit fee:", error);
      }
    };

    fetchEditFee();
  }, []);

  return (
    <>
      <div className={`flex flex-col min-h-screen bg-white ${styles.fullHeight}`}>
        <Navbar />
        <div className="flex flex-col w-full items-center">
          <div className="w-full flex flex-col items-center">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center">
              <h1 className="text-black dark:text-white text-2xl font-semibold max-w-xs sm:max-w-none md:text-5xl !leading-tight">
                Pricing
              </h1>
              <div
                className={`isolate mx-auto mt-4 mb-28 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none ${
                  tiers.length === 2 ? "lg:grid-cols-2" : ""
                } ${tiers.length === 3 ? "lg:grid-cols-3" : ""}`}
              >
                {tiers.map((tier) => (
                  <div
                    key={tier.id}
                    className={`max-w-xs ring-1 rounded-3xl p-8 xl:p-10 ${
                      tier.featured
                        ? "!bg-gray-900 ring-gray-900 dark:!bg-gray-100 dark:ring-gray-100"
                        : "bg-white dark:bg-gray-900/80 ring-gray-300/70 dark:ring-gray-700"
                    }`}
                  >
                    <h3
                      id={tier.id}
                      className={`text-2xl font-bold tracking-tight ${
                        tier.featured ? "text-white dark:text-black" : "text-black dark:text-white"
                      }`}
                    >
                      {tier.name}
                    </h3>
                    <p
                      className={`mt-4 text-sm leading-6 ${
                        tier.featured
                          ? "text-gray-300 dark:text-gray-500"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {tier.description}
                    </p>
                    <div className="mt-6 flex items-center justify-center">
                      <span
                        className={`text-3xl font-bold ${
                          tier.featured ? "text-white dark:text-black" : "text-black dark:text-white"
                        }`}
                      >
                        {(tier.price as Record<string, string>)[frequency.value]}
                      </span>
                    </div>
                    <ul
                      className={`mt-8 space-y-3 text-sm leading-6 xl:mt-10 ${
                        tier.featured
                          ? "text-gray-300 dark:text-gray-500"
                          : "text-gray-700 dark:text-gray-400"
                      }`}
                    >
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <CheckIcon className={tier.featured ? "text-white dark:text-black" : ""} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
