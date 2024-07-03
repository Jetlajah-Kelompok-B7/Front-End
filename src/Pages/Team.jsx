import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import { useDispatch } from "react-redux";
import { setHalaman } from "../redux/Reducers/TiketReducerforSecure";

export default function Team() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHalaman(""));
  }, [dispatch]);

  const teamMembers = [
    {
      name: "Hilzi Maulana Conquero",
      position: "Frontend Developer",
      image: "/images/hlzi.jpeg",
      social: {
        instagram: "https://www.instagram.com/hyzimc_/",
        Linkedin: "https://www.linkedin.com/in/hilzi-maulana-conquero/",
        github: "https://github.com/hconqr",
      },
    },
    {
      name: "Andika Arga Pradana",
      position: "Frontend Developer",
      image: "/images/andika.JPG",

      social: {
        instagram: "https://www.instagram.com/dikakakakka/",
        Linkedin: "https://www.linkedin.com/in/andika-arga-pradana-a13809190/",
        github: "https://github.com/AndikaArga",
      },
    },
    {
      name: "Syaiful Rizal Sidiq",
      position: "Frontend Developer",
      image: "/images/rizal2baru.jpg",
      social: {
        instagram: "https://www.instagram.com/syaifulrizal504/?hl=en",
        Linkedin: "https://www.linkedin.com/in/syaiful-rizal-sidiq/",
        github: "https://github.com/rizal504",
      },
    },
    {
      name: "Zabil Sabri Muhammad",
      position: "Backend Developer",
      image: "/images/zabil.jpeg",
      social: {
        instagram: "https://www.instagram.com/zabilsabri",
        Linkedin: "https://www.linkedin.com/in/zabil-sabri-muhammad-37694a233/",
        github: "https://github.com/zabilsabri",
      },
    },
    {
      name: "Hanafi Ulin Nuha",
      position: "Backend Developer",
      image: "/images/hanafi.png",
      social: {
        instagram: "https://www.instagram.com/envystfu/",
        Linkedin: "https://www.linkedin.com/in/hanhanafi/",
        github: "https://github.com/yokunoshita",
      },
    },
    {
      name: "Balya Aqila Rizqi Rabbi",
      position: "Backend Developer",
      image: "/images/balya.jpg",
      social: {
        instagram: "https://www.instagram.com/balyar.r/",
        Linkedin: "https://www.linkedin.com/in/balya-aqila-rizqi-rabbi/",
        github: "https://github.com/rizqi-r",
      },
    },
  ];
  return (
    <div className="bg-gray-100">
      <div className="bg-gray-100 container mx-auto min-h-screen flex flex-col items-center py-5">
        <div className="fixed top-0 w-full bg-white z-50 shadow">
          <div className="container mx-auto">
            <Navbar />
          </div>
        </div>
        <h1 className="italic font-extrabold text-[45px] mb-6 max-md:text-[45px] mt-20 text-center">
          Jetlajah.In Team
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-36 w-full max-xl:px-16 max-sm:px-10">
          {teamMembers &&
            teamMembers?.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 w-full text-center mx-auto"
              >
                <img
                  src={member.image}
                  alt={`${member.name}'s profile`}
                  className="size-24 bg-center bg-cover rounded-full mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
                <p className="text-gray-600 mb-4">{member.position}</p>
                <p className="text-gray-700">{member.description}</p>
                <div className="mt-4 flex justify-center space-x-4">
                  {member.social.Linkedin && (
                    <a
                      href={member.social.Linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        className="text-gray-600 hover:text-gray-900 transition duration-300"
                        size="lg"
                      />
                    </a>
                  )}
                  {member.social.instagram !== "" && (
                    <a
                      href={member.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className="text-gray-600 hover:text-gray-900 transition duration-300"
                        size="lg"
                      />
                    </a>
                  )}
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      icon={faGithub}
                      className="text-gray-600 hover:text-gray-900 transition duration-300"
                      size="lg"
                    />
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
