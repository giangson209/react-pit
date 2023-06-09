type RadioInputProps = {
  radioId: string;
  label: string;
  subLabel?: string;
  isChecked?: boolean;
  onChange?: () => void;
  onClick?: () => void
};

const RadioInput = ({ radioId, label, isChecked = false, onChange, subLabel, onClick }: RadioInputProps) => {
  return (
    <div onClick={onClick} className="relative flex items-center justify-start gap-4 md:mb-3 xl:mb-0">
      <button
        className={`absolute left-0 ${subLabel ? '' : 'top-0.5'} h-5 w-5 rounded-full border border-neutral-300 ${isChecked ? 'border-red-600' : ''}`}
        onClick={onChange}
      />
      <div className={`absolute left-1 ${subLabel ? '' : 'top-[0.375rem]'} h-3 w-3 rounded-full bg-red-600 ${isChecked ? 'block ' : 'hidden'}`} />
      <input
        type="checkbox"
        name="flexRadioDefault"
        id={radioId}
        value={label}
        checked={isChecked}
        onChange={onChange}
        className="h-4 w-4 opacity-0 cursor-pointer"
      />
      <div className="flex flex-col">
        <label htmlFor={radioId} className="cursor-default text-base font-medium md:font-bold text-neutral-800">{label}</label>
        <label htmlFor={radioId} className="text-sm font-normal text-neutral-500 mt-1">{subLabel}</label>
      </div>
    </div>
  );
};

export default RadioInput;
