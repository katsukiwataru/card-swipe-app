import React, { useState, useEffect } from 'react';
import Card from './containers/Card';
import styled from 'styled-components';

interface Props {}

const App: React.FC<Props> = () => {
  const [cards, setCards] = useState<User[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const getUsers = async () => {
    setError(false);
    setLoading(true);
    try {
      const QiitaUsers = await fetch('https://qiita.com/api/v2/users?page=' + pageNum);
      const resUsers: ResponseUser[] = await QiitaUsers.json();
      const users = resUsers.map<User>(({ id, profile_image_url, url }) => {
        return { id, profileImageUrl: profile_image_url, url };
      });
      // APIのレスポンス表示を降順にする
      setCards(users.reverse());
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, [pageNum]);

  const nextPage = () => {
    setPageNum(pageNum + 1);
  };

  return (
    <>
      <Card key={pageNum} cards={cards} setLoading={setLoading} nextPage={nextPage} />
      {error && (
        <ErrorTitle>
          <p>some error occurred, while fetching api</p>
        </ErrorTitle>
      )}
      {loading && (
        <LoadingTitle>
          <p>
            fetching books for "<strong>User</strong>"
          </p>
        </LoadingTitle>
      )}
    </>
  );
};

export default App;

const Title = styled.h1`
  font-size: 24px;
  text-align: center;
`;
const ErrorTitle = styled(Title)`
  color: #c33;
`;

const LoadingTitle = styled(Title)`
  color: #3b7;
`;
