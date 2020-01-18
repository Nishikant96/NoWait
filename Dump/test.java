import java.util.*;
import java.lang.*;
public class Main {
	
	public class node{
		long Data;
		node next;

public node(long itemData){
	Data=itemData;
}
		}
		
		
	public static addNew(node head,long itemData){
		node newItem= new node(itemData);
		newItem.next=null;
		
		if(head==null){
			head=newItem;	
			return;
		}
		else{
			node trailer=head;
			while (trailer.next!=null){
				trailer=trailer.next;
			}
			trailer.next=newItem;
		}
		return;
	}
	
 public static void main(String[] args) {
  Scanner sc = new Scanner(System.in);
  int N = sc.nextInt();
node head;  
  for (int i = 0; i < N; i++) {
	addNew(head,sc.nextLong());
  }
  int Q = sc.nextInt();
  int command = 0;
  for (int i = 0; i < Q; i++) {
	 command = sc.nextInt();
		if(command==1){
	addNew(head,sc.nextLong());		
		}
		else{
			System.out.println(head,findMax());
		}

  }
 }
}