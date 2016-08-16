/************************************
 * Kyle Szalai (E01006866)
 * COSC 231
 * Haynes MW 10:00am
 * 4/13/15
 * Homework 04/08
 ************************************/
import java.util.*;

public class lab0408 {

	public static void main(String[]args)
	{
		//Make our threads
		theThreads[] threads = new theThreads[3];
		for(int i=0;i<threads.length;i++)
		{
			threads[i] = new theThreads(i);
		}

		//Wait for each thread to finish
		try
		{
			threads[0].start();
			threads[1].start();
			threads[2].start();
			threads[0].join();
			threads[1].join();
			threads[2].join();
			
			System.out.println();
			
			for(int i=0;i<threads.length;i++)
			{
				System.out.println("Thread " + i + " max was " + threads[i].getMax() + " at location " + threads[i].getMaxIndex());
			}
		}
		catch (Exception e)
		{
			System.out.println("Error: Someone didn't finish their work!");
		}
	}

	public static class theThreads extends Thread	
	{
		//Variables
		protected int max;
		protected int max_index;
		protected int [] numbers;
		private int id;

		//Default will make 100 number array
		public theThreads(int id)
		{
			this.id = id;
			max = 0;
			numbers = new int [100];
		}

		//Will begin executing on Thread.start()
		public void run()
		{
			//To generate 
			Random theRando = new Random();

			//Try putting the thread to sleep
			try
			{
				for(int i=0;i<numbers.length;i++)
				{
					numbers[i] = theRando.nextInt((99)+1);
					System.out.println("thread " +  id); //To show interleaving
					yield();
				}
			}
			catch (Exception e)
			{
				e.printStackTrace();
			}
			
			//Find the maximum
			findMax();

		}

		//Find the biggest number
		public void findMax()
		{
			for(int i=0;i<numbers.length;i++)
			{
				if(numbers[i]>max)
				{
					max = numbers[i];
					max_index = i;
				}
			}
		}

		//Getter for max
		public int getMax()
		{
			return max;
		}

		//Getter for max_index
		public int getMaxIndex()
		{
			return max_index;
		}
	}
}
