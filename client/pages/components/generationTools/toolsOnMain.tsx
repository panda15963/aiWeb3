import React from "react";
import { Card, CardBody, Row, Col, CardHeader } from "reactstrap";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "../context/UserContext";

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
    tool_link: "/components/generationTools/text_to_image",
    price: "₩ 2,000",
    price_link: "/components/prices/pricing",
  },
  {
    title: "Image to Image",
    description: "Input image, get an image.",
    image: "/images/imgtoimg.png",
    tool_link: "/components/generationTools/image_to_image",
    price: "₩ 3,000",
    price_link: "/components/prices/pricing",
  },
  {
    title: "Multi-Promping",
    description: "Input multi-texts, get an image.",
    image: "/images/multiPromping.jpeg",
    tool_link: "/components/generationTools/multi-promping",
    price: "₩ 6,000",
    price_link: "/components/prices/pricing",
  },
];
const ToolsOnMain = () => {
  const { user } = useUser();

  return (
    <div className="container mx-auto p-4">
      <Row>
        <Col className="text-center">
          <div className="container mx-auto border-1 border-black rounded-md overflow-hidden shadow-lg">
            <h6 className="text-center text-4xl font-bold p-4 ">
              Choose your tool
            </h6>
            <hr className="border-black" />
            <div className="flex flex-row gap-4 justify-center bg-white shadow-2 p-4">
              {ToolsInformation.map((tool, index) => (
                <Card key={index} className="border-1 border-black rounded-md overflow-hidden shadow-lg">
                  <CardHeader>
                    <div>
                      {user ? (
                        <>
                          <Link href={tool.tool_link}>
                            <h1 className="uppercase font-bold">
                              {tool.title}
                            </h1>
                            <h2 className="text-default-500">{tool.description}</h2>
                          </Link>
                          <Link href={tool.price_link} className="text-default-500">
                            <h2 className="text-default-500">Price: {tool.price}</h2>
                          </Link>
                          <CardBody className="overflow-visible p-2">
                            <Image
                              alt="Card background"
                              className="object-cover rounded-xl"
                              src={tool.image}
                              width={270}
                              height={200}
                            />
                          </CardBody>
                        </>
                      ) : (
                        <>
                          <button onClick={() => alert("Sigin In first, please!")}>
                            <h1 className="uppercase font-bold">
                              {tool.title}
                            </h1>
                            <h2 className="text-default-500">{tool.description}</h2>
                          </button>
                          <Link href={tool.price_link} className="text-default-500">
                            <h2 className="text-default-500">Price: {tool.price}</h2>
                          </Link>
                          <CardBody className="overflow-visible p-2">
                            <Image
                              alt="Card background"
                              className="object-cover rounded-xl"
                              src={tool.image}
                              width={270}
                              height={200}
                            />
                          </CardBody>
                        </>
                      )}
                    </div>
                  </CardHeader>
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
