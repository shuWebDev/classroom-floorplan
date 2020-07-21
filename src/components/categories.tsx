import * as React from 'react';

const Categories: React.FC = () => {
  return (
    <nav>
      <ul className="no-bullet">
        <li><button type="button" value="Standard">Standard</button></li>
        <li><button type="button" value="HyFlex">HyFlex</button></li>
        <li><button type="button" value="Teams HyFlex">Teams HyFlex</button></li>
        <li><button type="button" value="Temporary HyFlex">Temporary HyFlex</button></li>
      </ul>
    </nav>
  );
}

export default Categories;