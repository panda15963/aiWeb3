import { useState } from "react";
import Navbar from "../navbar";
import Footer from "../Footer";
import styles from "./pricing.module.css";

// Define an interface for PricingTierFrequency, containing id, value and label properties
export interface PricingTierFrequency {
  id: string;
  value: string;
  label: string;
}

// Define an interface for PricingTier, containing name, id, href, discountPrice, price, description, features, featured, highlighted, cta, and soldOut properties
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

// Initialize an array of frequencies with one object
export const frequencies: PricingTierFrequency[] = [
  { id: "1", value: "1", label: "Every Times" },
];

// Initialize an array of tiers with three objects
export const tiers: PricingTier[] = [
  {
    name: "Text-to-Image",
    id: "0",
    href: "../generationTools/text_to_image",
    price: { "1": "100 MODIM" },
    description: `Input text, get an image what you want.`,
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
    price: { "1": "100 MODIM" },
    description: `Input image, get an image what you want.`,
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
    price: { "1": "100 MODIM" },
    description: `Input multiple texts, get an image what you want.`,
    features: [
      `Simple, easy-to-use interface`,
      `Multi-promping generation`,
      `Generation of images from multiple texts`,
    ],
    featured: true,
  },
];

// Define a functional component for CheckIcon
const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-6 h-6", className)}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const cn = (...args: Array<string | boolean | undefined | null>) =>
  args.filter(Boolean).join(" ");

export default function PricingPage() {
  const [frequency, setFrequency] = useState(frequencies[0]);
  const bannerText = "";
  return (
    <>
      <div className={`flex flex-col min-h-screen bg-white ${styles.fullHeight}`}>
        <Navbar />
        <div
          className={cn("flex flex-col w-full items-center")}
        >
          <div className="w-full flex flex-col items-center">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center">
              <h1 className="text-black dark:text-white text-2xl font-semibold max-w-xs sm:max-w-none md:text-5xl !leading-tight">
                Pricing
              </h1>
              {bannerText ? (
                <div className="w-full lg:w-auto flex justify-center my-4">
                  <p className="w-full px-4 py-3 text-xs bg-slate-100 text-black dark:bg-slate-300/30 dark:text-white/80 rounded-xl">
                    {bannerText}
                  </p>
                </div>
              ) : null}

              {frequencies.length > 1 ? (
                <div className="mt-16 flex justify-center">
                  <div
                    role="radiogroup"
                    className="grid gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 bg-white dark:bg-black ring-1 ring-inset ring-gray-200/30 dark:ring-gray-800"
                    style={{
                      gridTemplateColumns: `repeat(${frequencies.length}, minmax(0, 1fr))`
                    }}
                  >
                    <p className="sr-only">Payment frequency</p>
                    {frequencies.map((option) => (
                      <label
                        className={cn(
                          frequency.value === option.value
                            ? "bg-slate-500/90 text-white dark:bg-slate-900/70 dark:text-white/70"
                            : "bg-transparent text-gray-500 hover:bg-slate-500/10",
                          "cursor-pointer rounded-full px-2.5 py-2 transition-all"
                        )}
                        key={option.value}
                        htmlFor={option.value}
                      >
                        {option.label}
                        <button
                          value={option.value}
                          id={option.value}
                          className="hidden"
                          role="radio"
                          aria-checked={frequency.value === option.value ? "true" : "false"}
                          onClick={() => {
                            setFrequency(
                              frequencies.find(
                                (f) => f.value === option.value
                              ) as PricingTierFrequency
                            );
                          }}
                        >
                          {option.label}
                        </button>
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-12" aria-hidden="true"></div>
              )}              <div
                className={cn(
                  "isolate mx-auto mt-4 mb-28 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none select-none",
                  tiers.length === 2 ? "lg:grid-cols-2" : "",
                  tiers.length === 3 ? "lg:grid-cols-3" : ""
                )}
              >
                {tiers.map((tier) => (
                  <div
                    key={tier.id}
                    className={cn(
                      tier.featured
                        ? "!bg-gray-900 ring-gray-900 dark:!bg-gray-100 dark:ring-gray-100"
                        : "bg-white dark:bg-gray-900/80 ring-gray-300/70 dark:ring-gray-700",
                      "max-w-xs ring-1 rounded-3xl p-8 xl:p-10",
                      tier.highlighted ? styles.fancyGlassContrast : ""
                    )}
                  >
                    <h3
                      id={tier.id}
                      className={cn(
                        tier.featured
                          ? "text-white dark:text-black"
                          : "text-black dark:text-white",
                        "text-2xl font-bold tracking-tight"
                      )}
                    >
                      {tier.name}
                    </h3>
                    <p
                      className={cn(
                        tier.featured
                          ? "text-gray-300 dark:text-gray-500"
                          : "text-gray-600 dark:text-gray-400",
                        "mt-4 text-sm leading-6"
                      )}
                    >
                      {tier.description}
                    </p>
                    <div className="mt-6 flex items-center justify-center">
                      <span
                        className={cn(
                          tier.featured
                            ? "text-white dark:text-black"
                            : "text-black dark:text-white",
                          "text-3xl font-bold"
                        )}
                      >
                        {(tier.price as Record<string, string>)[frequency.value]}
                      </span>
                    </div>
                    <ul
                      className={cn(
                        tier.featured
                          ? "text-gray-300 dark:text-gray-500"
                          : "text-gray-700 dark:text-gray-400",
                        "mt-8 space-y-3 text-sm leading-6 xl:mt-10"
                      )}
                    >
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <CheckIcon
                            className={cn(
                              tier.featured ? "text-white dark:text-black" : "",
                              tier.highlighted
                                ? "text-slate-500"
                                : "text-gray-500",

                              "h-6 w-5 flex-none"
                            )}
                            aria-hidden="true"
                          />
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
