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
  price_link: string;
}
export interface ToolsOnMainProps {
  tools: InformationTools[];
}
const ToolsInformation: InformationTools[] = [
  {
    title: "Text-to-Image",
    description: "Input text, get an image.",
    image: "/images/txt2img.png",
    tool_link: "/components/generationTools/text_to_image",
    price_link: "/components/prices/pricing",
  },
  {
    title: "Image to Image",
    description: "Input image, get an image.",
    image: "/images/img2img.jpg",
    tool_link: "/components/generationTools/image_to_image",
    price_link: "/components/prices/pricing",
  },
  {
    title: "Multi-Promping",
    description: "Input multi-texts, get an image.",
    image: "/images/multiPromping.jpg",
    tool_link: "/components/generationTools/multi-promping",
    price_link: "/components/prices/pricing",
  },
];
export default function ToolsOnMain() {
  const { user } = useUser();

  return (
    <div className="m-8">
      <Row>
        <Col className="text-center">
          <div className="my-4 border-1 border-black rounded-md overflow-hidden shadow-lg">
            <h1 className="text-center text-4xl font-bold p-4 ">
              Choose your tool
            </h1>
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
                            <CardBody className="overflow-visible p-2">
                              <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src={tool.image}
                                style={{ width: 300, height: 300, objectFit: 'cover' }}
                                width={300}
                                height={300}
                                priority
                              />
                            </CardBody>
                          </Link>
                        </>
                      ) : (
                        <>
                          <button onClick={() => alert("Sigin In first, please!")}>
                            <h1 className="uppercase font-bold">
                              {tool.title}
                            </h1>
                            <h2 className="text-default-500">{tool.description}</h2>
                            <CardBody className="overflow-visible p-2">
                              <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src={tool.image}
                                style={{ width: 300, height: 300, objectFit: 'cover' }}
                                width={300}
                                height={300}
                                priority
                              />
                            </CardBody>
                          </button>
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