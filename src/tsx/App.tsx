import React, { useState, useEffect } from 'react';
import Card from './containers/Card';
// import Img from '../img/orca.png';

interface Props {}

const App: React.FC<Props> = () => {
  // console.log(Img);
  // const cards = [Img, Img, Img];
  const [cards, setCards] = useState<User[]>([]);
  useEffect(() => {
    const getUsers = async () => {
      // setError(false);
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
        console.log(error);
        // setError(true);
      }
    };
    getUsers();
  }, []);

  return (
    <>
      <Card cards={cards}></Card>
    </>
  );
};

export default App;
