import { FC } from "react";
import { BsWhatsapp, BsFacebook, BsTelegram } from "react-icons/bs";

const Footer: FC = () => {
  return (
    <footer className="fixed bottom-0 w-full z-50">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <div className="rounded-t-2xl px-4 py-3 shadow-md">
            <span className="text-white text-lg font-bold mr-3">Share</span>
            <span className="text-[#00F4E6] text-bold text-xl mr-3">|</span>
            <a
              href="whatsapp://send?text=https://fiqbola.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                id="whatsapp-button"
                className="bg-[#171D8D] text-white px-4 py-2 m-1 rounded-md shadow-lg"
              >
                <BsWhatsapp />
              </button>
            </a>
            <a
              href="https://www.facebook.com/share.php?u=https://fiqbola.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#171D8D] text-white px-4 py-2 m-1 rounded-md shadow-lg inline-flex items-center"
            >
              <BsFacebook />
            </a>
            <a
              href="https://t.me/fiqbola"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#171D8D] text-white text-center font-normal px-3 py-1 ml-2 my-1 rounded-md shadow-lg inline-flex items-center"
            >
              <BsTelegram className="mr-2 text-white" />
              <span>Join Telegram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
