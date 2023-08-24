import Image from 'next/image';

interface HeaderXProps {
   title: string;
   name: string;
   image: string;
}

const HeaderX = ({ title, name, image }: HeaderXProps) => {
   return (
      <div className="w-full flex justify-between">
         <h1 className="title">{title}</h1>
         <div>
            <div className="relative rounded-full overflow-hidden w-[50px] h-[50px]">
               <Image
                  src={image}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
               />
            </div>
         </div>
      </div>
   );
};

export default HeaderX;
