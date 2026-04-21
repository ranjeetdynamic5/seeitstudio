type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
};

export default function EnquiryModal({ isOpen, onClose, title }: Props) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2 className="text-xl font-bold mb-4">
        Enquiry about {title}
      </h2>

      <p className="text-sm text-[#64748B] mb-6">
        {title}
      </p>

      <button onClick={onClose}>Close</button>
    </div>
  );
}