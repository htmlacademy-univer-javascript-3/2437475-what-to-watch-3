type PropsTabsNavigation = {
        setTab: (tabName: string) => void;
        activeTab: string;
}

export function TabsNavigation({setTab, activeTab}: PropsTabsNavigation) {
  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        <li className={`film-nav__item ${activeTab === 'Overview' ? 'film-nav__item--active' : ''}`}>
          <button className="film-nav__link" onClick={() => setTab('Overview')}>Overview</button>
        </li>
        <li className={`film-nav__item ${activeTab === 'Details' ? 'film-nav__item--active' : ''}`}>
          <button className="film-nav__link" onClick={() => setTab('Details')}>Details</button>
        </li>
        <li className={`film-nav__item ${activeTab === 'Reviews' ? 'film-nav__item--active' : ''}`}>
          <button className="film-nav__link" onClick={() => setTab('Reviews')}>Reviews</button>
        </li>
      </ul>
    </nav>
  );
}
