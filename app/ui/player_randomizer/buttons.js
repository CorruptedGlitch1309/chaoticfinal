import { buttonStyle } from "@/app/styles/elements";

export default function Buttons(props) {
  return (
    <>
      <button
        className={"p-0.5 mr-2 rounded" + buttonStyle}
        onClick={props.randomAction}
      >
        Randomize
      </button>
      <button
        className={"p-0.5 mr-2 rounded" + buttonStyle}
        onClick={props.deleteAction}
      >
        Delete Selected
      </button>
      <button
        className={"p-0.5 rounded" + buttonStyle}
        onClick={props.createAction}
      >
        Add Player
      </button>
    </>
  );
}
