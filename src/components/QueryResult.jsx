import React from 'react';
import { Loader2 } from 'lucide-react';

// Hapus baris 'import ./QueryResult.css' karena sudah tidak diperlukan lagi

function QueryResult({ results, error, isLoading, successMessage }) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-6">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return <div className="mt-6 p-4 rounded-lg border bg-destructive/10 text-destructive"><strong>Error:</strong> {error}</div>;
  }

  if (successMessage) {
    return <div className="mt-6 p-4 rounded-lg border bg-primary/10 text-primary">{successMessage}</div>;
  }

  if (!results) {
    return <div className="mt-6 p-4 rounded-lg border text-muted-foreground">Hasil query akan muncul di sini...</div>;
  }

  if (results.length === 0) {
    return <div className="mt-6 p-4 rounded-lg border text-muted-foreground">Query berhasil, namun tidak ada data yang ditemukan.</div>;
  }

  const headers = Object.keys(results[0]);

  return (
    <div className="mt-6 border rounded-lg overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="border-b">
          <tr>
            {headers.map(header => (
              <th key={header} className="h-12 px-4 font-medium text-muted-foreground">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b transition-colors even:bg-muted/50 hover:bg-muted/50">
              {headers.map(header => (
                <td key={`${rowIndex}-${header}`} className="p-4">
                  {String(row[header])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QueryResult;