import React, { useState, useEffect } from 'react';
import Card from './containers/Card';
// import Img from '../img/orca.png';

interface Props {}

const App: React.FC<Props> = () => {
  // console.log(Img);
  // const cards = [Img, Img, Img];
  const [cards, setCards] = useState<User[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setError(false);
      setLoading(true);
      try {
        const QiitaUsers = await fetch('https://qiita.com/api/v2/users', {
          method: 'GET',
        });
        const resUsers: ResponseUser[] = await QiitaUsers.json();
        const users = resUsers.map<User>(({ id, profile_image_url, url }) => {
          return { id, profileImageUrl: profile_image_url, url };
        });
        setCards(users);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    getUsers();
  }, []);

  return (
    <>
      <Card cards={cards}></Card>
      {error && <div style={{ color: `red` }}>some error occurred, while fetching api</div>}
      {loading && (
        <div style={{ color: `green` }}>
          fetching books for "<strong>User</strong>"
        </div>
      )}
    </>
  );
};

export default App;
