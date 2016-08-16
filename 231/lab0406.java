/*****************************************
 * Kyle Szalai (E01006866)
 * COSC 231
 * Haynes MW 10:00am
 * lab0406.java
 * 
 * A GUI program that essentially 
 * mimics a dialer.
 *****************************************/
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class lab0406 {

	public static void main(String[] args) {
		//Initialize JFrame
		JFrame window = new JFrame();
		window.setDefaultCloseOperation(window.EXIT_ON_CLOSE);
		window.setSize(300,400);
		window.setLayout(new BorderLayout());
		
		//Add a label to the program
		JLabel programName = new JLabel("Dialer");
		window.add(programName,BorderLayout.NORTH);
		
		//Add a text field to show up numbers
		final JTextField entryWindow = new JTextField();
		entryWindow.setEditable(false); //Prevent editing
		window.add(entryWindow,BorderLayout.CENTER);
		
		//Make a panel for the number pad to go into
		JPanel numberPad = new JPanel();
		numberPad.setLayout(new GridLayout(4,3)); //4x3 Grid
		
		//Add number buttons to number pad
		JButton [] buttons = new JButton [12];
		
		//Make the new buttons
		for(int i=0;i<12;i++)
		{
			if(i>=10)
			{
				if(i==10)
					buttons[i] = new JButton("*");
				else
					buttons[i] = new JButton("#");
			}
			else
				buttons[i] = new JButton(Integer.toString(i));
		}
		
		//Add buttons to number pad
		for(int i=0; i<=9;i++)
		{
			numberPad.add(buttons[i+1]);
		}
		numberPad.add(buttons[10]);
		numberPad.add(buttons[0]);
		numberPad.add(buttons[11]);
		
		//This string builder will allow for the string
		//in our entryWindow to update
		final StringBuilder sb = new StringBuilder();
		
		for(int i=0;i<12;i++)
		{
			//Make a new ActionListener for the buttons
			//They all do the same thing
			buttons[i].addActionListener(new ActionListener()
			{
				public void actionPerformed(ActionEvent e)
				{
					//Get the string from the button
					String str = e.getActionCommand();
					//Add it to the StringBuilder
					sb.append(str);
					//Update the entryWindow
					entryWindow.setText(sb.toString());
				}
			});
		}
		
		//Add numberPad to JFrame
		window.add(numberPad,BorderLayout.SOUTH);
		
		//Make JFrame Visible
		window.setVisible(true);
	}
}
