package kr.or.ddit.board;

import java.util.List;
import java.util.Scanner;

import kr.or.ddit.board.service.BoardServiceImpl;
import kr.or.ddit.board.service.IBoardService;
import kr.or.ddit.board.vo.BoardVO.BoardVO;

public class MainBoard {
	
	private IBoardService bService; 
	private Scanner sc;
	
	public MainBoard() {
		sc = new Scanner(System.in);
		bService = new BoardServiceImpl();
	}
	
	/**
	 * 메뉴를 출력하는 메서드
	 */
	public void displayMenu() {
		System.out.println();
		System.out.println("----------------------");
		System.out.println("  1. 전체 목록 출력");
		System.out.println("  2. 새글 작성");
		System.out.println("  3. 수정");
		System.out.println("  4. 삭제");
		System.out.println("  5. 검색");
		System.out.println("  6. 작업 끝.");
		System.out.println("----------------------");
		System.out.print("원하는 작업 선택 >> ");
	}
	
	
	
	
	/**
	 * 프로그램을 시작 메서드
	 */
	public void start() {
		int input;
		
		do {
			displayMenu();
			input = sc.nextInt();
			switch (input) {
			case 1 :
				DisplayBoardAll();	// 전체 목록 출력
				break;
			case 2 : 
				insertBoard();	// 새글 작성
				break;
			case 3 : 
				UpdateBoard();	// 수정
				break;
			case 4 : 
				DeleteBoard();	// 삭제
				break;
			case 5 :
				SearchBoard();	// 검색
				break;
			case 6 : 
				System.out.println("작업을 마칩니다.");
				break;
			default:
				System.out.println("번호를 잘못 입력하셨습니다. 다시 입력해주세요");
			}
		} while(input != 6);
	}
	
	/**
	 * 검색 메서드

	 */
	private void SearchBoard() {
		sc.nextLine();	// 입력 버퍼 지우기
		System.out.println();
		System.out.println("검색할 정보를 입력하세요.");
		
		
		System.out.print(" 제목  >> ");
		String boardTitle = sc.nextLine().trim();
		
		System.out.print(" 작성자 >> ");
		String boardWriter = sc.nextLine().trim();
		
		System.out.print(" 내용 >> ");
		String boardContent = sc.nextLine().trim();
		
		BoardVO bv = new BoardVO();
		bv.setBoardTitle(boardTitle);
		bv.setBoardWriter(boardWriter);
		bv.setBoardContent(boardContent);
		
		List<BoardVO> bList = bService.SearchBoard(bv);
		
		// 입력한 정보로 검색한 내용을 출력하기
		System.out.println();
		System.out.println("--------------------------------------");
		System.out.println("게시판\t번호\t제목\t\t작성자\t작성날짜\t\t\t\t내  용");
		System.out.println("--------------------------------------");
	
		
		for (BoardVO bVO : bList) {
			System.out.println("\t"+bVO.getBoardNo() + "\t"+  bVO.getBoardTitle() + "\t" + bVO.getBoardWriter() + "\t"
					+ bVO.getBoardDate() + "\t\t" + bVO.getBoardContent());
		}
		
		System.out.println("--------------------------------------");
		System.out.println("검색작업 끝...");
		
	}

	/**
	 * 게시글 삭제 메서드
	 */
	private void DeleteBoard() {
		System.out.println();
		System.out.println("삭제할 게시물 번호를 입력하세요.");
		System.out.print("게시물 번호 >> ");
		int boardNo = sc.nextInt();
		
		int cnt = bService.DeleteBoard(boardNo);
		
		if(cnt > 0) {
			System.out.println(boardNo + "번 게시물 삭제 성공");
		} else {
			System.out.println(boardNo + "번 게시물 삭제 성공");
		}
	}

	/**
	 * 게시글 수정 메서드
	 */
	private void UpdateBoard() {
		boolean chk = false;	// 기존 회원 존재여부 체크 
		int boardNo =0;
		
		do {
			System.out.println();
			System.out.println("수정할 게시물 번호를 입력하세요.");
			System.out.print("게시물 번호 >> ");
			boardNo = sc.nextInt();
			
			chk = getBoard(boardNo);
			
			if(!chk) {
				System.out.println(boardNo + "인 게시물은 없습니다.");
				System.out.println("다시 입력해주세요");
			}
		} while(chk== false);
		
		System.out.print("제목 >> ");
		String boardTitle = sc.next();
		
		sc.nextLine();
		System.out.print("내용 >> ");
		String boardContent = sc.nextLine();
		
		
		BoardVO bv = new BoardVO();
		
		bv.setBoardNo(boardNo);
		bv.setBoardTitle(boardTitle);
		bv.setBoardContent(boardContent);
		
		int cnt = bService.updateBoard(bv);
		
		if(cnt > 0) {
			System.out.println(boardNo + "번 글 수정 완료");
		} else {
			System.out.println(boardNo + "번 글 수정 실패");
		}
		
	}

	private boolean getBoard(int boardNo) {
		return bService.getBoard(boardNo);
	}

	/**
	 * 전체 출력 메서드
	 */
	private void DisplayBoardAll() {

		System.out.println();
		System.out.println("-----------------------------------------------------------------------");
		System.out.println("게시판\t번호\t제목\t\t작성자\t작성날짜\t\t\t내  용");
		System.out.println("-----------------------------------------------------------------------");

		List<BoardVO> bList = bService.DisplayBoardAll();

		for (BoardVO bVO : bList) {
			System.out.println("\t"+bVO.getBoardNo() + "\t"+  bVO.getBoardTitle() + "\t" + bVO.getBoardWriter() + "\t"
					+ bVO.getBoardDate() + "\t\t" + bVO.getBoardContent());
		}

		System.out.println("------------------------------------------");
		System.out.println("출력 작업 끝...");
	}


	/**
	 * 새글을 작성하는 메서드
	 */
	private void insertBoard() {

		 System.out.println();
	      System.out.println("게시판 작성을 위해 이름을 먼저 입력해주세요");
	      sc.nextLine();
	      System.out.print("작성자 이름 >> ");
	      String boardWriter = sc.nextLine();

	      System.out.print("제목 >> ");
	      String boardTitle = sc.nextLine();
	      
	      System.out.print("내용 >> ");
	      String boardContent = sc.nextLine();
	   
	      BoardVO bv = new BoardVO();
	      
	      bv.setBoardWriter(boardWriter);
	      bv.setBoardTitle(boardTitle);
	      bv.setBoardContent(boardContent);
	      
	      int cnt = bService.insertBoard(bv);
	      
	      if(cnt > 0) {
	         System.out.println(boardWriter + "님 작성 성공");
	      }else {
	         
	         System.out.println(boardWriter + "님 작성 실패");
	      }
	   }
	
	
	/**
	 * 메인
	 */
	public static void main(String[] args) {
	      MainBoard mb = new MainBoard();
	      mb.start();
	   }
}