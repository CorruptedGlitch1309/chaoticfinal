import { generateControls, route } from "@/app/lib/actions";
import { setType } from "@/app/lib/redux/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";


export default function TypeSelect () {
    const dispatch = useDispatch();
    const randomizerType = useSelector((state) => state.randomizerType);
    const selectedParams = useSelector((state) => state.selectedParams);
    const loadoutParams = useSelector((state) => state.loadoutParams);

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    return (
        <div className="min-w-96 w-11/12 min-h-24 mx-auto p-2 bg-gray-600 rounded-md">
              <select id="type-select"
              className="bg-gray-600 text-2xl mx-auto block text-center"
              value={randomizerType}
              onChange={() => {
                router.push(`${pathname}?${route(selectedParams, loadoutParams, document.getElementById("type-select").value, searchParams)}`);
                dispatch(setType(document.getElementById("type-select").value));
              }}>
                <option value="team-randomizer">Team Randomizer</option>
                <option value="finals-loadout">Finals Loadout Generator</option>
              </select>
              <hr className="my-2 w-full"/>

              {generateControls(randomizerType)}
        </div>
    )
}