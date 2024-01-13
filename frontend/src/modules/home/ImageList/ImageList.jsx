import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { getImageListApi } from "../../../api/imageApis";
import { Button, Card } from "flowbite-react";

const ImageList = () => {
    const navigate = useNavigate();

    const {
        data = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["imageList"],
        queryFn: getImageListApi,
    });

    return (
        <div className="grid grid-cols-5 gap-4">
            {data.map((image) => {
                return (
                    <Link to={`/image/${image.image_id}`} className="grid">
                        <Card
                            key={image.image_id}
                            className="max-w-full"
                            imgAlt="img alt"
                            imgSrc={image.url}
                        >
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {image.image_name}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {image.description}
                            </p>
                        </Card>
                    </Link>
                    
                );
            })}
        </div>
    );
};

export default ImageList;
