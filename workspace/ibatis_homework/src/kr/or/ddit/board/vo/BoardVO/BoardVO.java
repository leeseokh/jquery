package kr.or.ddit.board.vo.BoardVO;

import javax.xml.crypto.Data;

/*
 	DB 테이블에 있는 컬럼을 기준으로 데이터를 객체화한 클래스
 	
 		DB테이블의 '컬럼'이 이 클래스의 '멤버변수'가 된다.
 		DB테이블의 컬럼과 클래스의 멤버변수를 매핑하는 역할을 한다.
 	
 */

public class BoardVO {
	
	public int getBoardNo() {
		return boardNo;
	}
	public void setBoardNo(int boardNo) {
		this.boardNo = boardNo;
	}
	public String getBoardWriter() {
		return boardWriter;
	}
	public void setBoardWriter(String boardWriter) {
		this.boardWriter = boardWriter;
	}
	public String getBoardTitle() {
		return boardTitle;
	}
	public void setBoardTitle(String boardTitle) {
		this.boardTitle = boardTitle;
	}
	public Data getBoardDate() {
		return boardDate;
	}
	public void setBoardDate(Data boardDate) {
		this.boardDate = boardDate;
	}
	public String getBoardContent() {
		return boardContent;
	}
	public void setBoardContent(String boardContent) {
		this.boardContent = boardContent;
	}
	private int boardNo;
	private String boardWriter;
	private String boardTitle;
	private Data boardDate;
	private String boardContent;
	
	@Override
	public String toString() {
		return "BoardVO [boardNo=" + boardNo + ", boardWriter=" + boardWriter + ", boardTitle=" + boardTitle
				+ ", boardDate=" + boardDate + ", boardContent=" + boardContent + "]";
	}
}
	
	