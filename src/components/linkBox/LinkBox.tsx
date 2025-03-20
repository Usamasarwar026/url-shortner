import React from "react";
import Image from "next/image";
import { FaTwitter, FaYoutube, FaVimeo } from "react-icons/fa";
import { RiUnsplashFill } from "react-icons/ri";
import { MdContentCopy } from "react-icons/md";
import { TbWorldWww } from "react-icons/tb";
import { IMAGES } from "@/constant/images";

interface LinkData {
  shortLink: string;
  originalLink: string;
  platform: "twitter" | "youtube" | "blog" | "vimeo" | "unsplash" | "travel";
  clicks: number;
  status: "Active" | "Inactive";
  date: string;
}

export default function LinkBox() {
  // Sample data based on the image
  const links: LinkData[] = [
    {
      shortLink: "https://linkly.com/Bn41aCOlnxj",
      originalLink: "https://www.twitter.com/tweets/8erelCoihu/",
      platform: "twitter",
      clicks: 1313,
      status: "Active",
      date: "Oct - 10 -2023",
    },
    {
      shortLink: "https://linkly.com/Bn41aCOlnxj",
      originalLink: "https://www.youtube.com/watch?v=8J7ZmH0lXuk",
      platform: "youtube",
      clicks: 4313,
      status: "Inactive",
      date: "Oct - 08 -2023",
    },
    {
      shortLink: "https://linkly.com/Bn41aCOlnxj",
      originalLink: "https://www.adventuresinwanderlust.com/",
      platform: "blog",
      clicks: 1013,
      status: "Active",
      date: "Oct - 01 -2023",
    },
    {
      shortLink: "https://linkly.com/Bn41aCOlnxj",
      originalLink: "https://vimeo.com/625257654",
      platform: "vimeo",
      clicks: 1313,
      status: "Active",
      date: "Sep - 20 -2023",
    },
    {
      shortLink: "https://linkly.com/Bn41aCOlnxj",
      originalLink: "https://unsplash.com/photos/2KjNwOzFfVQ",
      platform: "unsplash",
      clicks: 1423,
      status: "Active",
      date: "Sep - 18 -2023",
    },
    {
      shortLink: "https://linkly.com/Bn41aCOlnxj",
      originalLink: "https://www.travelwiththejoneses.com/",
      platform: "travel",
      clicks: 3213,
      status: "Active",
      date: "Sep - 01 -2023",
    },
  ];

  // Function to get platform icon
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "twitter":
        return (
          <div className="bg-blue-400 rounded-full p-2">
            <FaTwitter className="text-white" />
          </div>
        );
      case "youtube":
        return (
          <div className="bg-red-600 rounded-full p-2">
            <FaYoutube className="text-white" />
          </div>
        );
      case "blog":
        return (
          <div className="bg-black rounded-full p-2">
            <TbWorldWww className="text-white" />
          </div>
        );
      case "vimeo":
        return (
          <div className="bg-blue-500 rounded-full p-2">
            <FaVimeo className="text-white" />
          </div>
        );
      case "unsplash":
        return (
          <div className="bg-gray-800 rounded-full p-2">
            <RiUnsplashFill className="text-white" />
          </div>
        );
      case "travel":
        return (
          <div className="bg-red-600 rounded-full p-2">
            <FaYoutube className="text-white" />
          </div>
        );
      default:
        return (
          <div className="bg-gray-500 rounded-full p-2">
            <TbWorldWww className="text-white" />
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg ">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-800 bg-[#181E29] text-[#C9CED6]">
              <th className="py-4 px-4 text-left">Short Link</th>
              <th className="py-4 px-4 text-left">Original Link</th>
              <th className="py-4 px-4 text-center">QR Code</th>
              <th className="py-4 px-4 text-center">Clicks</th>
              <th className="py-4 px-4 text-left">Status</th>
              <th className="py-4 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link, index) => (
              <tr key={index} className="border-b border-gray-800">
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <span className="mr-2 text-[#C9CED6]">
                      {link.shortLink}
                    </span>
                    <button className="text-[#C9CED6] hover:text-white">
                      <MdContentCopy size={18} />
                    </button>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    {getPlatformIcon(link.platform)}
                    <span className="ml-2 truncate max-w-xs text-[#C9CED6]">
                      {link.originalLink}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex justify-center">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <Image
                        src={IMAGES.QR_CODE}
                        alt="Grid Icon"
                        width={24}
                        height={24}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-center text-[#C9CED6]">
                  {link.clicks}
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex justify-center">
                    <span
                      className={`flex items-center gap-2 ${
                        link.status === "Active"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {link.status}
                      {link.status === "Active" ? (
                        <Image
                          src={IMAGES.ACTIVE}
                          alt="active link"
                          width={35}
                          height={35}
                        />
                      ) : (
                        <Image
                          src={IMAGES.INACTIVE}
                          alt="inactive link"
                          width={35}
                          height={35}
                        />
                      )}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-right text-[#C9CED6]">
                  {link.date}
                </td>
              </tr>
            ))}
            {/* <tfoot>
          <tr className="sticky bottom-0 bg-[#181E29] bg-opacity-20 backdrop-blur-md">

              <td colSpan={6} className="py-4 px-4 text-center font-bold">
                Register Now to enjoy Unlimited Usage
              </td>
            </tr>
          </tfoot> */}
          </tbody>
          
        </table>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import Image from "next/image";
// import { FaTwitter, FaYoutube, FaVimeo } from "react-icons/fa";
// import { RiUnsplashFill } from "react-icons/ri";
// import { MdContentCopy } from "react-icons/md";
// import { TbWorldWww } from "react-icons/tb";
// import { ChevronDown } from "lucide-react";

// interface LinkData {
//   shortLink: string;
//   originalLink: string;
//   platform: "twitter" | "youtube" | "blog" | "vimeo" | "unsplash" | "travel";
//   clicks: number;
//   status: "Active" | "Inactive";
//   date: string;
// }

// export default function LinkShortener() {
//   // Sample data based on the image
//   const links: LinkData[] = [
//     {
//       shortLink: "https://linkly.com/Bn41...",
//       originalLink: "https://www.twitter.com/tweets/8erelCoihu/",
//       platform: "twitter",
//       clicks: 1313,
//       status: "Active",
//       date: "Oct - 10 -2023",
//     },
//     {
//       shortLink: "https://linkly.com/Bn41...",
//       originalLink: "https://www.youtube.com/watch?v=8J7ZmH0lXuk",
//       platform: "youtube",
//       clicks: 4313,
//       status: "Inactive",
//       date: "Oct - 08 -2023",
//     },
//     {
//       shortLink: "https://linkly.com/Bn41...",
//       originalLink: "https://vimeo.com/625257654",
//       platform: "vimeo",
//       clicks: 1313,
//       status: "Active",
//       date: "Sep - 20 -2023",
//     },
//     {
//       shortLink: "https://linkly.com/Bn41...",
//       originalLink: "https://unsplash.com/photos/2KjNwOzFfVQ",
//       platform: "unsplash",
//       clicks: 1423,
//       status: "Active",
//       date: "Sep - 18 -2023",
//     },
//   ];

//   // For mobile view, we'll just show first 4 links
//   const mobileLinks = links.slice(0, 4);
//   const [usedLinks, setUsedLinks] = useState(5);
//   const [totalLinks, setTotalLinks] = useState(5);

//   // Function to copy link to clipboard
//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text);
//     // Could add a toast notification here
//   };

//   return (
//     <>
//       {/* Desktop view - Full table */}
//       <div className="hidden md:block bg-gray-900 text-white rounded-lg shadow-lg">
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead>
//               <tr className="border-b border-gray-800 bg-[#181E29] text-[#C9CED6]">
//                 <th className="py-4 px-4 text-left">Short Link</th>
//                 <th className="py-4 px-4 text-left">Original Link</th>
//                 <th className="py-4 px-4 text-center">QR Code</th>
//                 <th className="py-4 px-4 text-center">Clicks</th>
//                 <th className="py-4 px-4 text-left">Status</th>
//                 <th className="py-4 px-4 text-left">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {links.map((link, index) => (
//                 <tr key={index} className="border-b border-gray-800">
//                   <td className="py-4 px-4">
//                     <div className="flex items-center">
//                       <span className="mr-2 text-[#C9CED6]">{link.shortLink}</span>
//                       <button
//                         className="text-[#C9CED6] hover:text-white"
//                         onClick={() => copyToClipboard(link.shortLink)}
//                       >
//                         <MdContentCopy size={18} />
//                       </button>
//                     </div>
//                   </td>
//                   <td className="py-4 px-4">
//                     <div className="flex items-center">
//                       <span className="ml-2 truncate max-w-xs text-[#C9CED6]">
//                         {link.originalLink}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="py-4 px-4 text-center">
//                     <div className="flex justify-center">
//                       <div className="w-8 h-8 flex items-center justify-center">
//                         {/* QR code placeholder */}

//                       </div>
//                     </div>
//                   </td>
//                   <td className="py-4 px-4 text-center text-[#C9CED6]">{link.clicks}</td>
//                   <td className="py-4 px-4 text-center">
//                     <div className="flex justify-center">
//                       <span
//                         className={`flex items-center gap-2 ${
//                           link.status === "Active"
//                             ? "text-green-500"
//                             : "text-yellow-500"
//                         }`}
//                       >
//                         {link.status}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="py-4 px-4 text-right text-[#C9CED6]">{link.date}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Mobile view - Card layout */}
//       <div className="md:hidden bg-slate-900 text-white rounded-lg shadow-lg overflow-hidden w-full max-w-md mx-auto">
//         {/* Header */}
//         <div className="p-4 border-b border-slate-700">
//           <h2 className="text-xl font-semibold">Shorten Links</h2>
//         </div>

//         {/* Links List */}
//         <div className="divide-y divide-slate-700">
//           {mobileLinks.map((link, index) => (
//             <div key={index} className="p-4 flex items-center justify-between">
//               <span className="text-gray-300 truncate mr-2 flex-1">{link.shortLink}</span>
//               <div className="flex items-center">
//                 <button
//                   className="p-2 text-gray-400 hover:text-white"
//                   aria-label="Copy link"
//                   onClick={() => copyToClipboard(link.shortLink)}
//                 >
//                   <MdContentCopy size={18} />
//                 </button>
//                 <button
//                   className="p-2 ml-2 text-gray-400 hover:text-white rounded-full bg-slate-800"
//                   aria-label="Expand options"
//                 >
//                   <ChevronDown size={18} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Footer */}
//         <div className="p-4 bg-slate-800/50 text-center">
//           <div className="text-sm text-gray-400 mb-2">
//             Links History: {usedLinks}/{totalLinks} links used
//           </div>
//           <div>
//             <a href="#" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
//               Register Now
//             </a>
//             <span className="text-gray-400 text-sm"> to enjoy Unlimited History</span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
