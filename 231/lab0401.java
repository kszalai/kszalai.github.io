/*****************************
 * Kyle Szalai (E01006866)
 * COSC 231
 * 04/01/15
 * lab0401.java
 * 
 * A simple Java GUI that will
 * calculate the area of a
 * rectangular cuboid.
 *****************************/
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class lab0401 extends JFrame {
	
	public static void main(String[]args)
	{
		//Initialize JFrame
		JFrame window = new JFrame();
		window.setDefaultCloseOperation(window.EXIT_ON_CLOSE);
		window.setSize(400, 200);
		window.setLayout(new BorderLayout());
		
		//Put a label at the top of the GUI
		JLabel programName = new JLabel("Cube Volume Calculator");
		window.add(programName,BorderLayout.NORTH);
		
		//Create a text entry panel and place at bottom
		JPanel textEntry = new JPanel();
		window.add(textEntry,BorderLayout.SOUTH);
		final JTextField length = new JTextField("length"); 
		length.setEditable(true);
		final JTextField width = new JTextField("width");
		width.setEditable(true);
		final JTextField height = new JTextField("height");
		height.setEditable(true);
		
		//Add the text entries to the textEntry panel
		textEntry.add(length);
		textEntry.add(width);
		textEntry.add(height);
		
		//Set up answer area and put in center
		final JTextField answer = new JTextField();
		window.add(answer,BorderLayout.CENTER);
		
		//Add a button to calculate the textEntry panel
		JButton calc = new JButton("Calculate Area");
		textEntry.add(calc);
		
		//Make the button do an action
		calc.addActionListener(new ActionListener()
		{
			public void actionPerformed(ActionEvent e) 
			{
				String result = calcArea(length.getText(),width.getText(),height.getText());
				answer.setText(result);
			}
		});
		
		//Make frame visible
		window.setVisible(true);
	}
	
	//A method to calculate the area of a cube
	protected static String calcArea(String l, String w, String h)
	{
		//Variables
		double length = Double.valueOf(l);
		double width = Double.valueOf(w);
		double height = Double.valueOf(h);
		String result;
		
		//Because we're adding this to a textField
		//we can set the text in there so make the
		//answer a String
		result = Double.toString(length*width*height);
		
		return result;
	}
}
