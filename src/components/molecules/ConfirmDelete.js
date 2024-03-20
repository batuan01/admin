import { Modal } from "../molecules/Modal";
import { ButtonModal } from "../atoms/Button";
import { BsXLg } from "react-icons/bs";

export const ConfirmDelete = ({ title, isOpen, setIsOpen, onClick }) => {
  const ContentModal = (
    <div>
      <div className="flex justify-between items-center pb-5 mb-5 border-b-2">
        <p className="text-xl font-bold">DELETE</p>
        <div
          className="w-5 h-5 cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <BsXLg />
        </div>
      </div>
      <p className="block mb-1.5">{title}</p>
      <div className="flex justify-end items-center gap-5 pt-5">
        <ButtonModal
          title={"Cancel"}
          type={"button"}
          sizeSm={true}
          onClick={() => setIsOpen(false)}
          className={"border-black border-[1px] w-20 text-black bg-slate-500"}
        />
        <ButtonModal
          title={"Delete"}
          type={"submit"}
          sizeSm={true}
          className={"w-20 bg-red"}
          onClick={onClick}
        />
      </div>
    </div>
  );
  return <Modal isOpen={isOpen} setIsOpen={setIsOpen} content={ContentModal} />;
};
