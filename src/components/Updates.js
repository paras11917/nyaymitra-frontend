import React from 'react'
import newsData from "../pages/newsData"
const Updates = () => {
   return (
      <div className='flex flex-col'>
         <div className='flex flex-col items-center'>
            <div className="w-[69px] h-[5px]" style={{ background: 'linear-gradient(225deg, #F76680 0%, #57007B 100%)' }}>

            </div>

            <div className='text-[35px] leading-[55px] text-center'>
               Updates<br /> Your Daily Legal News Feed
            </div>
         </div>
         <div className='mt-[80px] w-full'>
            <div className='flex flex-col gap-[39px] items-center overflow-y-auto'>

               {newsData?.map(news => (
                  <div className='flex flex-row w-[80%]'>
                     <div className='w-[300px] rounded-[10px]'>
                        <img className="h-full w-full" src={require("../images/Case-study__image.png")} alt='img' />
                     </div>
                     <div className='p-[30px] bg-indigo-50 rounded-r-[30px]'>
                        <div className='text-[28px] font-[600] leading-[38px]  mr-[27px] mb-[40px]'>
                           {news.title}

                        </div>
                        <div className='mr-[47px] text-[14px] font-[400] leading-[22px] text-gray-700 mb-[60px]'>
                           {news.content}
                        </div>
                        <div className='text-[14px] font-[600] leading-[14px] bg-clip-text text-transparent bg-gradient-to-r from-[#F76680]
                           to-[#57007B] text-right'>
                           Read more
                        </div>
                     </div>
                  </div>

               ))}
               {/* <div className='flex flex-row'>
                  <div className='w-[604px] h-[422px]'>
                     <img className="h-full w-full" src={require("../images/Case-study__image.png")} alt='im' />
                  </div>
                  <div className='p-[30px]'>
                     <div className='text-[28px] font-[600] leading-[38px]  mr-[27px] mb-[40px]'>
                        Akasa Air takes legal action against 43 pilots for joining other airlines without serving a notice period: Report | Mint

                     </div>
                     <div className='mr-[47px] text-[14px] font-[400] leading-[22px] text-gray-700 mb-[60px]'>
                        Born out of a vision, a single-minded objective that puts service before anything else, Swift Clearance and Forwarding Corp. surging forth to deliver the best services in the shipping and logistics scenario. Its meteoric rise stems out of a solid foundation. The management boasts of over 20 years of rich and varied experience in the shipping and freight forwarding industry.
                     </div>
                     <div className='text-[14px] font-[600] leading-[14px] bg-clip-text text-transparent bg-gradient-to-r from-[#F76680]
                           to-[#57007B] text-right'>
                        Read more
                     </div>
                  </div>
               </div>
               <div className='flex flex-row'>
                  <div className='w-[604px] h-[422px]'>
                     <img className="h-full w-full" src={require("../images/Case-study__image.png")} alt='im' />
                  </div>
                  <div className='p-[30px]'>
                     <div className='text-[28px] font-[600] leading-[38px]  mr-[27px] mb-[40px]'>
                        Akasa Air takes legal action against 43 pilots for joining other airlines without serving a notice period: Report | Mint

                     </div>
                     <div className='mr-[47px] text-[14px] font-[400] leading-[22px] text-gray-700 mb-[60px]'>
                        Born out of a vision, a single-minded objective that puts service before anything else, Swift Clearance and Forwarding Corp. surging forth to deliver the best services in the shipping and logistics scenario. Its meteoric rise stems out of a solid foundation. The management boasts of over 20 years of rich and varied experience in the shipping and freight forwarding industry.
                     </div>
                     <div className='text-[14px] font-[600] leading-[14px] bg-clip-text text-transparent bg-gradient-to-r from-[#F76680]
                           to-[#57007B] text-right'>
                        Read more
                     </div>
                  </div>
               </div> */}
            </div>

            <div className=' mt-[38px] mb-[88px] text-[20px] font-[600] leading-[27px] bg-clip-text text-transparent bg-gradient-to-r from-[#F76680]
                           to-[#57007B] text-right'>
               Click for more stories
            </div>
         </div>
      </div>
   )
}

export default Updates;
