import {
  faBathtub,
  faBed,
  faCar,
  faDog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import numeral from "numeral";

export default function PropertyCard({
  title,
  destination,
  image,
  bathrooms,
  bedrooms,
  price,
  hasParking,
  petFriendly,
}) {
  return (
    <li>
      <Link href={destination}>
        <a className="border-2 border-slate-300 p-5 block bg-slate-100 hover:bg-slate-200 h-full">
          <div className="flex w-full">
            <Image
              src={image}
              height={200}
              width={300}
              objectFit="cover"
              alt={title}
            />
          </div>
          <h2 className="mt-3 text-lg font-bold">{title}</h2>
          <div className="text-lg">${numeral(price).format("0,0")}</div>
          <div className="flex justify-between text-sm mt-3">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faBathtub} />
              <span>{bathrooms} bathrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faBed} />
              <span>{bedrooms} bedrooms</span>
            </div>
          </div>

          {hasParking || petFriendly ? (
            <div className="flex justify-between text-sm mt-3">
              {hasParking ? (
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCar} />
                  <span> Parking available</span>
                </div>
              ) : null}
              {petFriendly ? (
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faDog} />
                  <span> Pet friendly</span>
                </div>
              ) : null}
            </div>
          ) : null}
        </a>
      </Link>
    </li>
  );
}
