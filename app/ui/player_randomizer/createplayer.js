import Image from "next/image";

export default function CreatePlayer (props) {

    return (
        <div className="flex bg-gray-700 w-56 rounded-full">
              <Image
              src="/user.png"
              height={50}
              width={50}
              alt=""
              className="rounded-full mr-2"
              />
              <div className="flex justify-between w-8/12">
                <input placeholder="New Player" type="text" className="create-player w-10/12 h-full bg-gray-700 text-xl"
                />
                <button
                className="text-2xl bg-gray-300 rounded-full my-2 w-5 text-gray-600"
                onClick={props.onClick}>+</button>
              </div>
        </div>
    )
}