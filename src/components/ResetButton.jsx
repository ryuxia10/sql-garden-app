import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDatabase } from "../context/DatabaseContext"; // Impor hook context

export function ResetButton() {
  const { resetSandbox } = useDatabase(); // Ambil fungsi reset dari context

  const handleReset = () => {
    if (window.confirm("Apakah Anda yakin ingin mereset semua perubahan di sandbox?")) {
      resetSandbox(); // Panggil fungsi reset dari context
    }
  };

  return (
    <Button variant="outline" size="icon" onClick={handleReset} title="Reset Sandbox">
      <RefreshCw className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Reset Sandbox</span>
    </Button>
  );
}