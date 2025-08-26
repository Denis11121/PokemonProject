interface Props {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  return (
    <div>
      <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        Prev
      </button>
      <span>
        {page}/{totalPages}
      </span>
      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
