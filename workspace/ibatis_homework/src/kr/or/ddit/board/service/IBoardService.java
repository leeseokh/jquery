package kr.or.ddit.board.service;

import java.util.List;

import kr.or.ddit.board.vo.BoardVO.BoardVO;

public interface IBoardService {

	public int insertBoard(BoardVO bv);

	public List<BoardVO> DisplayBoardAll();

	public int updateBoard(BoardVO bv);

	public boolean getBoard(int boardNo);

	public int DeleteBoard(int boardNo);

	public List<BoardVO> SearchBoard(BoardVO bv);

}