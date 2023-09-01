import ProgressSummary from '@/components/page/ProgressSummary/ProgressSummary';

const Page = async () => {
   // const userMe = await fetchingServer<UserMeType>('/delivery/v1/user/me');
   const date = new Date().toDateString();
   return (
      <div className="h-[100vh] w-[100%] pt-5 px-4 bg-white">
         <div className="mb-5">
            <p className="text-[30px] text-gray-700">Progress Summary</p>
            <p className="text-gray-600">{date}</p>
         </div>
         <ProgressSummary />;
      </div>
   );
};

export default Page;
