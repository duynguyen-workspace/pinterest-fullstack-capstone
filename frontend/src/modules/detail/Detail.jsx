import { getImageByIdApi } from '../../api/imageApis';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const Detail = () => {
    const { imageId } = useParams()

    const {
        data = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["imageDetail", imageId],
        queryFn: () => getImageByIdApi(imageId),
    });

    console.log("data", data)

    return (
        <section className="bg-slate-100 dark:bg-gray-900 py-8">
            <div className="container mx-auto md:max-w-5xl sm:max-w-2xl">
                <div className='flex items-center bg-white p-6 rounded-2xl shadow dark:border dark:bg-gray-800 dark:border-gray-700'>
                    <img src={data.url} width={500} height={500} className='rounded-lg object-cover'></img>
                
                    <div className='flex flex-col items-start ps-5 w-full'>
                        <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{data.image_name}</h5>
                        <p className='font-normal text-gray-700 dark:text-gray-400'>{data.description}</p>
                        <div className='user'>
                            
                        </div>
                        <h1>Comments</h1>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Detail
