import { Search } from "react-feather";
import "./InputSearch.css";


interface InputProps {
  Placeholder: string
}

export function InputSearch({ Placeholder }: InputProps) {
  return (
    <section className="input-search">
     <input type="search" placeholder={Placeholder} />
     <Search size={20} />
    </section>
  );
}
