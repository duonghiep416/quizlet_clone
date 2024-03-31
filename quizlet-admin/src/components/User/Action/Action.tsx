import {
  PencilSquareIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { Tooltip } from "@nextui-org/react";
const Action = () => {
  return (
    <div className="flex gap-1">
      <Tooltip
        content="Detail"
        color="success"
        classNames={{
          content: "text-white",
        }}
        placement="left"
      >
        <div className="cursor-pointer rounded-full p-[6px] hover:bg-green-400/35">
          <EyeIcon width={20} height={20} />
        </div>
      </Tooltip>
      <Tooltip content="Edit" color="secondary">
        <div className="cursor-pointer rounded-full p-[6px]  hover:bg-sky-500/35">
          <PencilSquareIcon width={20} height={20} />
        </div>
      </Tooltip>
      <Tooltip content="Delete" color="danger" placement="right">
        <div className="cursor-pointer rounded-full p-[6px]  hover:bg-red/35">
          <TrashIcon width={20} height={20} />
        </div>
      </Tooltip>
    </div>
  );
};

export default Action;
