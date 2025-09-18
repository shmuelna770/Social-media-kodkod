// src/comps/BottomSheet.tsx
// import "../style/bottomSheet.css";

type BottomSheetProps = {
  open: boolean;
  onClose: () => void;
    postId?: number;
};

export default function BottomSheet({ open,}: BottomSheetProps) {
  return (
    <div className={`bottom-sheet ${open ? "open" : ""}`}>
      <div className="sheet-content">
        {/* כאן נוסיף תוכן בהמשך */}
      </div>
    </div>
  );
}
