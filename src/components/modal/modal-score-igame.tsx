import Svg from '../icon/svg';

type Props = {
  scores: number;
  reward: boolean;
  rewardCoin: number;
};

const ModalScoreGame = ({ scores, reward, rewardCoin }: Props) => {
  return (
    <div className="sm:space-y-2 [&_p]:text-sm sm:[&_p]:text-base p-4 sm:p-10">
      <Svg src="/icons/bold/itel-game.svg" color="red" className="mx-auto h-12 w-12 sm:w-20 sm:h-20" />
      <h2 className="text-center text-xl sm:text-3xl font-bold py-4">{reward ? 'Bạn chơi siêu đỉnh!' : 'Ui Tiếc quá!'}</h2>
      {reward ? (
        <p>
          Bất ngờ quá! Bạn đã đạt được <strong>{scores} điểm</strong> trong lần chơi này. iTel gửi bạn <strong>{rewardCoin} xu</strong> cho
          thành tích của bạn.
        </p>
      ) : (
        <p>
          Bạn đã đạt được <strong>{scores} điểm</strong> trong lần chơi này. Chỉ cần thêm <strong>100 điểm</strong> nữa thôi là bạn có thể
          nhận được <strong>{rewardCoin}</strong> xu rồi.
        </p>
      )}
      <p>Cố gắng nữa hơn nào!</p>
    </div>
  );
};
export default ModalScoreGame;
