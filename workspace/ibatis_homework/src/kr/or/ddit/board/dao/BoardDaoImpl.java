package kr.or.ddit.board.dao;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ibatis.sqlmap.client.SqlMapClient;

import kr.or.ddit.board.vo.BoardVO.BoardVO;
import kr.or.ddit.util.SqlMapClientFactory;

public class BoardDaoImpl implements IBoardDao {

	private static IBoardDao bDao;

	private SqlMapClient smc;
	
	private BoardDaoImpl() {
		smc = SqlMapClientFactory.getInstance();
	}
	
	public static IBoardDao getInstance() {
		if(bDao == null) {
			bDao = new BoardDaoImpl();
		}
		return bDao;
	}
	
	@Override
	public int insertBoard(BoardVO bv) {
		
		int cnt = 0;
		
		try {
			Object obj = smc.insert("boardTest.insertBoard", bv);
			
			if(obj == null) {
				cnt = 1;
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return cnt;
	}
	
	@Override
	public int DeleteBoard(int boardNo) {
		int cnt = 0;
		
		try {
			cnt = smc.delete("boardTest.deleteBoard", boardNo);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return cnt;
	}

	@Override
	public int updateBoard(BoardVO bv) {
		int cnt = 0;
		
		try {
			cnt = smc.update("boardTest.updateBoard", bv);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return cnt;
	}
	
	@Override
	public List<BoardVO> DisplayBoardAll() {
		List<BoardVO> bList = new ArrayList<>();

		try {
			bList = smc.queryForList("boardTest.getBoardAll");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return bList;
	}


	@Override
	public boolean getBoard(int boardNo) {
		boolean chk = false;

		try {
			int cnt = (int) smc.queryForObject("boardTest.getBoard", boardNo);
			
			if(cnt > 0) {
				chk = true;
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
	
		return chk;
	}


	@Override
	public List<BoardVO> SearchBoard(BoardVO bv) {
		List<BoardVO> bList = new ArrayList<>();

		try {
			bList = smc.queryForList("boardTest.SearchBoard", bv);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return bList;
	}
}