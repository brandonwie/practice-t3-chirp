import { type NextPage } from "next";
import { encode, decode, type BarcodedBoardingPass } from "bcbp";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { PageLayout } from "~/components/layout";
import { ClassRegistry } from "superjson/dist/class-registry";
import { Copy } from "@phosphor-icons/react";
import toast from "react-hot-toast";

type TDecodedBCBP = ReturnType<typeof decode>;
const sampleBCBP =
  "M1GALLEN/JORDAN       E1234567POXCDGVOL0001 280Y001A0085 100";

const Flights: NextPage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [parsedBCBP, setParsedBCBP] = useState<TDecodedBCBP | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [parsed, setParsed] = useState(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (parsed) {
      setParsed(false);
      setParsedBCBP(null);
      setError(null);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    if (!inputRef.current || inputRef.current.value.length === 0) {
      toast.error("Input is empty");
      return;
    }
    try {
      const decodedBCBP = decode(inputRef.current.value);
      console.log(decodedBCBP);
      setParsedBCBP(decodedBCBP);
      setParsed(true);
      toast.success("Successfully parsed!");
    } catch (error) {
      toast.error("decode error: " + String(error));
    }
  };

  console.log(parsedBCBP);

  return (
    <PageLayout>
      <div className="flex items-center justify-between border-b border-slate-300 p-4">
        <span className="text-2xl font-bold">BCBP Parser</span>
        <span>@brandonwie</span>
      </div>
      <div className="broder-slate-300 flex flex-col gap-3 border-b p-4">
        <span>Parse BCBP string:</span>
        <div className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            placeholder={`enter BCBP string without \" or \'`}
            className="grow rounded-xl p-4 text-slate-800 outline-none"
          />
          <button
            className="rounded-xl bg-slate-300 p-4 text-slate-800"
            onClick={handleClick}
          >
            {parsed ? "RESET" : "PARSE"}
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <div>Sample BCBP string:</div>
          <div className="flex justify-evenly text-red-300">
            {sampleBCBP}{" "}
            <Copy
              size={20}
              className={"hover:cursor-pointer"}
              onClick={() => {
                navigator.clipboard
                  .writeText(sampleBCBP)
                  .catch((err) => setError(String(err)));
                toast("Copied to clipboard", { icon: "📋" });
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 border-b border-slate-300">
        <div className="border-b border-slate-300 p-4">
          <div className="text-xl font-bold">Data field</div>
          <div>
            {parsedBCBP ? JSON.stringify(parsedBCBP.data, null, 2) : ""}
          </div>
        </div>
        <div className="border-b border-slate-300 p-4">
          <div className="text-xl font-bold">Meta field</div>
          <div>
            {parsedBCBP ? JSON.stringify(parsedBCBP.meta, null, 2) : ""}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Flights;
