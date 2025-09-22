import './search-debt.less';
import { type ChangeEvent, useState } from 'react';

interface SearchDebtProps {
  onSearch: (query: string) => void;
}

export const SearchDebt = ({ onSearch }: SearchDebtProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [queryError, setQueryError] = useState<boolean>(false);

  const triggerSearch = () => {
    if (searchQuery.length > 0 && searchQuery.length < 3) {
      setQueryError(true);
      return;
    }

    setQueryError(false);

    onSearch(searchQuery);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (searchQuery.length >= 3) {
      setQueryError(false);
    }

    setSearchQuery(e.target.value);
  };

  return (
    <div className="search-debt">
      <div className="search-debt__input-wrapper">
        <label
          htmlFor="debt-search-input"
          className="search-debt__search-input-label search-debt__search-input-label--uppercase"
        >
          Podaj NIP lub nazwę dłużnika:
        </label>
        <input
          type="search"
          id="debt-search-input"
          name="search-query"
          className="search-debt__search-input"
          value={searchQuery}
          onChange={(e) => onInputChange(e)}
          onKeyDown={(e) => e.key === 'Enter' && triggerSearch()}
        />
        {queryError && <span className="search-debt__error-msg">Wprowadź min. 3 znaki.</span>}
      </div>

      <button
        type="button"
        className="search-debt__search-button search-debt__search-button--uppercase"
        onClick={triggerSearch}
      >
        Szukaj
      </button>
      {queryError && <span className="search-debt__error-msg">Wprowadź min. 3 znaki.</span>}
    </div>
  );
};
