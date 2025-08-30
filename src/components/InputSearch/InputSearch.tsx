import { Search } from "react-feather";
import "./InputSearch.css";


interface InputProps {
  Placeholder: string
  OnSearch: (value: string) => void
}



export function InputSearch({ Placeholder, OnSearch }: InputProps) {
  return (
    <section className="input-search">
     <input type="search" placeholder={Placeholder} onChange={(e) => OnSearch(e.target.value)} />
     <Search size={20} />
    </section>
  );
}
