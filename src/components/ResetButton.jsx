import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ResetButton() {
  const handleReset = () => {
    if (window.confirm("Apakah Anda yakin ingin mereset semua perubahan di sandbox?")) {
      // Hapus ID sesi dari penyimpanan browser
      localStorage.removeItem('sqlGardenSessionId');
      // Muat ulang halaman
      window.location.reload();
    }
  };

  return (
    <Button variant="outline" size="icon" onClick={handleReset} title="Reset Sandbox">
      <RefreshCw className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Reset Sandbox</span>
    </Button>
  );
}