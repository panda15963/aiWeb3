import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import Link from "next/link";
export interface InformationTools {
  title: string;
  description: string;
  image: string;
  tool_link: string;
  price: string;
  price_link: string;
}
export interface ToolsOnMainProps {
  tools: InformationTools[];
}
const ToolsInformation: InformationTools[] = [
  {
    title: "Text-to-Image",
    description: "Input text, get an image what you want.",
    image: "/images/hero-card-complete.jpeg",
    tool_link: "/frontend-radio",
    price: "2 USD",
    price_link: "/components/prices/pricing",
  },
  {
    title: "Image to Image",
    description: "Input image, get an image what you want.",
    image: "/images/hero-card-complete.jpeg",
    tool_link: "/backend-radio",
    price: "3.5 USD",
    price_link: "/components/prices/pricing",
  },
  {
    title: "Multi-Promping",
    description: "Input multiple texts, get an image what you want.",
    image: "/images/hero-card-complete.jpeg",
    tool_link: "/fullstack-radio",
    price: "6 USD",
    price_link: "/components/prices/pricing",
  },
];
const ToolsOnMain = () => {
  return (
    <>
      <div className="flex flex-row gap-4 justify-center bg-white shadow-2">
        {ToolsInformation.map((tool, index) => (
          <Card key={index} className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <Link
                href={tool.tool_link}
                className="text-tiny uppercase font-bold"
              >
                {tool.title}
              </Link>
              <Link href={tool.tool_link} className="text-default-500">
                <small className="text-default-500">{tool.description}</small>
              </Link>
              <Link href={tool.price_link} className="text-default-500">
                <small className="text-default-500">Price: {tool.price}</small>
              </Link>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={tool.image}
                width={270}
              />
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
};
export default ToolsOnMain;
