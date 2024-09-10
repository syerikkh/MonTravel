import { GetServerSideProps } from "next";
import { axiosInstance } from "@/utils/axiosInstance";

interface TravelProps {
  travels: [
    {
      _id: string;
      title: string;
      description: string;
      image: string;
    }
  ];
}

const Destinations = ({ travels }: TravelProps) => {
  console.log("inages", travels[0].image);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="mb-4 text-2xl font-bold text-gray-700">
        Travel Destinations
      </h2>
      {travels.length > 0 ? (
        <div className="mt-4 space-y-4">
          {travels.map((travel) => (
            <div key={travel._id} className="p-4 border rounded shadow">
              <h3 className="text-xl font-semibold">{travel.title}</h3>
              <p className="text-gray-600">{travel.description}</p>
              {travel.image && (
                <img
                  src={travel.image}
                  alt={travel.title}
                  className="mt-2 w-full h-28 rounded"
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4">No travel data available</p>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await axiosInstance.get("/travels");
    return {
      props: {
        travels: res.data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        travels: [],
      },
    };
  }
};

export default Destinations;
