/**********************************
 * Kyle Szalai (E01006866)
 * COSC 471
 * Haynes TR 10:00am
 * 
 * Project 1
 * Implement System Catalog
 * 
 * Source Code: http://people.emich.edu/kszalai/471/pp1.java
 **********************************/
import java.io.*;
import java.util.*;

public class pp1 {

	public static void main(String[] args) {
		Scanner kbd = new Scanner(System.in);
		String command = "";
		String[] commandArr;
		do{ //Allows commands to be entered until quit
			System.out.print("SQL> ");
			int indexCount = 0;
			command = kbd.nextLine();
			//Unload the command into an array
			commandArr = command.split("\\s");

			//Count the commandArr
			for(int i=0;i<commandArr.length;i++)
				indexCount++;
			
			switch(commandArr[0].toLowerCase())
			{
			case "create":
				if(indexCount <= 1)//See if object is with command
					System.out.println("Error: Object to create not specified");
				else
				{
					//Check for what object to create
					if(commandArr[1].toLowerCase().equals("database"))
					{
						//Check to see if a name is included
						if(indexCount<=2)
						{
							System.out.println("Error: No name for database entered");
						}
						else
						{	
							if(commandArr[2].length()>=7) //Check valid db name length
								System.out.println("Error: Database name can be up to 6 characters long");
							else
							{
								try {
									//Setup files
									File table = new File("sys_" + commandArr[2] + ".tab");
									RandomAccessFile tab = new RandomAccessFile(table,"rwd");
									File attribute = new File("sys_" + commandArr[2] + ".att");
									RandomAccessFile attri = new RandomAccessFile(attribute,"rwd");
									/********************TAB File********************/
									writeTabEntry(table,tab);
									writeTabEntry(attribute,tab);
									/********************ATT File********************/
									int tabOffsetCount = 0;
									writeAttEntry(table,attri,"NAME",tabOffsetCount,2,16);
									tabOffsetCount += 16;
									writeAttEntry(table,attri,"LOCATION",tabOffsetCount,2,64);
									tabOffsetCount += 64;
									writeAttEntry(table,attri,"TYPE",tabOffsetCount,1,4);

									int attOffsetCount = 0;
									writeAttEntry(attribute,attri,"NAME",attOffsetCount,2,16);
									attOffsetCount += 16;
									writeAttEntry(attribute,attri,"TNAME",attOffsetCount,2,16);
									attOffsetCount += 16;
									writeAttEntry(attribute,attri,"OFFSET",attOffsetCount,1,4);
									attOffsetCount += 4;
									writeAttEntry(attribute,attri,"TYPE",attOffsetCount,1,4);
									attOffsetCount += 4;
									writeAttEntry(attribute,attri,"LENGTH",attOffsetCount,1,4);

									tab.close();
									attri.close();

									System.out.println("Database " + commandArr[2] + " has been created.");
								} catch (IOException e) {
									System.out.println("Error: Monkey goofed while creating data dictionary!");
								}
							}
						}
					}
				}
				break;
			case "drop":
				//See if object included
				if(indexCount <= 1)
					System.out.println("Error: Object to drop not specified");
				else
				{
					//Check what object is included
					if(commandArr[1].toLowerCase().equals("database"))
					{
						//Check to see if name of object included
						if(indexCount <= 2)
							System.out.println("Error: No database name entered!");
						else
						{
							File table = new File("sys_" + commandArr[2] + ".tab");
							File attribute = new File("sys_" + commandArr[2] + ".att");
							boolean tabExists = table.exists();
							boolean attExists = attribute.exists();
							if(tabExists && attExists) //If the files exist
							{
								table.delete(); //Delete them
								attribute.delete();
								System.out.println("Database " + commandArr[2] + " successfully deleted");
							}
							else if(!tabExists || !attExists) //If they don't exist, show error
								System.out.println("Error: Database " + commandArr[2] + " doesn't exist!");
						}
					}
				}
				break;
			case "print":
				//Code will be replaced later with different command
				if(indexCount <= 1)
					System.out.println("Error: Object to print not specified!");
				else
				{
					if(commandArr[1].toLowerCase().equals("catalog"))
					{
						if(indexCount <= 2)
							System.out.println("Error: Database catalog to print not specified!");
						else
						{
							File table = new File("sys_" + commandArr[2] + ".tab");
							File attribute = new File("sys_" + commandArr[2] + ".att");
							
							//If the tables exist, print them
							if(table.exists() && attribute.exists())
							{
								try 
								{
									RandomAccessFile tab = new RandomAccessFile("sys_" + commandArr[2] + ".tab", "r");
									RandomAccessFile attri = new RandomAccessFile("sys_" + commandArr[2] + ".att", "r");

									//Print tab File
									//Print out attribute names for table
									for(int i=0;i<3;i++)
									{
										if(i==2)
											System.out.print("                                              ");
										for(int j=0;j<16;j++)
										{
											if(attri.readChar()!=0x00)
											{
												attri.seek(attri.getFilePointer()-2);
												System.out.print(attri.readChar());
											}
											else
												System.out.print(" ");
										}
										attri.readLine();
									}
									System.out.println();
									System.out.println("-------------------------------------------------------------------------------------");
									//Print out information from sys_.tab
									while(tab.readLine()!=null)
									{
										tab.seek(tab.getFilePointer()-166);
										for(int i=0;i<80;i++) //Printing characters, 2 bytes each
										{
											if(tab.readChar()!=0x00)
											{
												tab.seek(tab.getFilePointer()-2);
												System.out.print(tab.readChar());
											}
											else
												System.out.print(" ");
										}
										System.out.print(tab.readInt());
										System.out.print(tab.readChar());
									}

									System.out.println();

									//Print att file
									//Print out attribute names for the table
									for(int i=0;i<5;i++)
									{
										for(int j=0;j<16;j++)
										{
											if(attri.readChar()!=0x00)
											{
												attri.seek(attri.getFilePointer()-2);
												System.out.print(attri.readChar());
											}
											else
												System.out.print(" ");
										}
										attri.readLine();
									}
									System.out.println();
									System.out.println("------------------------------------------------------------------------");

									//All attributes for both tables printed, seek to 0
									attri.seek(0);
									while(attri.readLine()!=null)
									{
										attri.seek(attri.getFilePointer()-78);
										for(int i=0;i<32;i++) //Printing chars, 2 bytes each
										{
											if(attri.readChar()!=0x00)
											{
												attri.seek(attri.getFilePointer()-2);
												System.out.print(attri.readChar());
											}
											else
												System.out.print(" ");
										}
										System.out.print(attri.readInt());
										System.out.print("                 ");
										System.out.print(attri.readInt());
										System.out.print("               ");
										System.out.print(attri.readInt());
										System.out.print(attri.readChar());
									}
									System.out.println();
									
									//Close files since we're done with them
									tab.close();
									attri.close();
								} catch (IOException e) {
									e.printStackTrace();
								}
							}
							else
							{
								System.out.println("Error: Database does not exist!");
							}
						}
					}
				}
				break;
			case "quit":
				kbd.close();
				System.out.println("Goodbye!");
				break;
			default:
				System.out.println("Invalid command.");
				break;
			}
		}while(!command.toLowerCase().equals("quit"));
	}//End method main

	//A method to write a .tab entry
	public static void writeTabEntry(File file, RandomAccessFile raf)
	{
		try
		{
			String name; //16 char max
			String dir; //64 char max
			int type; //Data types: 10 - Data file, 11 - Primary Index, 21 - Meta Data File

			//Name Field
			if(file.getName().length()>16)
				name = file.getName().substring(0,12) + "...";
			else
				name = file.getName();
			raf.writeChars(name);//16 chars = 32 bytes
			raf.seek(raf.getFilePointer() - (name.length()*2));
			raf.seek(raf.getFilePointer() + 32);

			//Location Field
			dir = System.getProperty("user.dir") + "\\" + file.getName();
			if(dir.length() > 64)
				dir = dir.substring(0,60) + "...";
			raf.writeChars(dir);//64 chars = 128 bytes
			raf.seek(raf.getFilePointer() - (dir.length()*2));
			raf.seek(raf.getFilePointer()+128);

			//Data Type
			//10 = Data File, 11 = Primary Index, 21 = meta data file
			//Currently writing meta data in
			if(file.getName().startsWith("sys_"))
				type = 21;//This is a meta file
			else
				type = 10;//This is a different file. Specifications can be done later
			raf.writeInt(type);//1 int = 4 bytes

			//New line to separate records
			raf.writeChars("\n");//1 char = 2 bytes
		}
		catch(IOException e)
		{
			System.out.println("Error: Creating entry goofed");
		}

	}//End method writeTabEntry

	//A method to write a .att entry
	public static void writeAttEntry(File file, RandomAccessFile raf, String attName, int offsetLoc, int attType, int attLength)
	{
		try
		{
			//Attribute Name Field
			if(attName.length() > 16)
				attName = attName.substring(0,15);
			raf.writeChars(attName);//16 chars = 32 bytes
			raf.seek(raf.getFilePointer() - (attName.length()*2));
			raf.seek(raf.getFilePointer() + 32);

			//Table Name Field
			String fileName = file.getName();
			if(fileName.length() > 16)
				fileName = fileName.substring(0,15);
			raf.writeChars(fileName);//16 chars = 32 bytes
			raf.seek(raf.getFilePointer() - (fileName.length()*2));
			raf.seek(raf.getFilePointer() + 32);

			//Offset Field
			raf.writeInt(offsetLoc);

			//Attribute Type Field
			raf.writeInt(attType);

			//Length Field
			raf.writeInt(attLength);

			//New Line character to separate records
			raf.writeChars("\n");
		} 
		catch (IOException e)
		{
			System.out.println("Error: Creating entry goofed");
		}
	}//End method writeAttEntry
}//End class main