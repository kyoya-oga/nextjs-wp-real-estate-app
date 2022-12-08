import ButtonLink from "components/ButtonLink/ButtonLink";
import Link from "next/link";
import { FaHeart, FaHouseUser } from "react-icons/fa";

function MainMenu({ items, callToActionButton }) {
  return (
    <div
      className="bg-slate-800 text-white px-5 h-16 sticky top-0 z-20 flex items-center
  "
    >
      <Link href="/">
        <a className="py-4 pl-5 flex text-pink-600">
          <FaHouseUser size={30} />
          <FaHeart size={30} />
          <span className="sr-only">home</span>
        </a>
      </Link>
      <nav className="flex-1">
        <div className="flex justify-end items-center">
          {items.map((item) => {
            return (
              <div key={item.id} className="relative group hover:bg-slate-700 ">
                <div>
                  <Link href={item.destination}>
                    <a className="p-5 block">{item.label}</a>
                  </Link>
                </div>
                {item.subMenuItems?.length ? (
                  <div className="group-hover:block hidden bg-slate-800 text-right absolute right-0 top-full -mt-3">
                    {item.subMenuItems.map((subMenuItem) => {
                      return (
                        <Link
                          key={subMenuItem.id}
                          href={subMenuItem.destination}
                        >
                          <a className="hover:bg-slate-700 block whitespace-nowrap p-5">
                            {subMenuItem.label}
                          </a>
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
          <div className="ml-3 my-auto">
            <ButtonLink
              destination={callToActionButton.destination.uri}
              label={callToActionButton.label}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default MainMenu;
