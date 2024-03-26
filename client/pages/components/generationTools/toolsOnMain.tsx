import React from "react";
import { Card, CardBody, Row, Col, CardHeader } from "reactstrap";
import Link from "next/link";
import Image from "next/image";
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
    description: "Input text, get an image.",
    image: "/images/txttoimg.jpeg",
    tool_link: "/frontend-radio",
    price: "2 USD",
    price_link: "/components/prices/pricing",
  },
  {
    title: "Image to Image",
    description: "Input image, get an image.",
    image: "/images/imgtoimg.png",
    tool_link: "/backend-radio",
    price: "3.5 USD",
    price_link: "/components/prices/pricing",
  },
  {
    title: "Multi-Promping",
    description: "Input multi-texts, get an image.",
    image: "/images/multiPromping.jpeg",
    tool_link: "/fullstack-radio",
    price: "6 USD",
    price_link: "/components/prices/pricing",
  },
];
const ToolsOnMain = () => {
  return (
    <div className="content mx-auto p-4">
      <Row>
        <Col className="text-center">
          <div className="container mx-auto border-1 border-black rounded-md overflow-hidden shadow-lg">
            <h6 className="text-center text-4xl font-bold p-4 ">
              Choose your tool
            </h6>
            <hr className="border-black" />
            <div className="flex flex-row gap-4 justify-center bg-white shadow-2 py-4">
              {ToolsInformation.map((tool, index) => (
                <Card key={index} className="py-4 border-1 border-black rounded-md overflow-hidden shadow-lg">
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <div>
                      <Link
                        href={tool.tool_link}
                        className="text-tiny uppercase font-bold"
                      >
                        {tool.title}
                      </Link>
                    </div>
                    <div>
                      <Link href={tool.tool_link} className="text-default-500">
                        <small className="text-default-500">{tool.description}</small>
                      </Link>
                    </div>
                    <div>
                      <Link href={tool.price_link} className="text-default-500">
                        <small className="text-default-500">Price: {tool.price}</small>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardBody className="overflow-visible p-2">
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl"
                      src={tool.image}
                      width={270}
                      height={200}
                    />
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default ToolsOnMain;
