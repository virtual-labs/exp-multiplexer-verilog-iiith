## Modules Required -

- Verilog Module
- Verilog Test bench

## Code -

### Verilog Module -  

- The code block that defines inputs, outputs, module name should be placed first, followed by the code block that defines the module functionality and then finally the end of module block.
- Drag and drop the code blocks to arrange them in the order mentioned above.
- Now enter a name for the verilog module. Make sure that the name begins with alphabets and can only include alphanumeric characters and '_' character without any spaces or other special characters in between.
- Select the inputs and outputs in the input/output declaration block.
- Now, to define the functionality of the module, the assign block has to be filled. The output must be assigned the value as per the given equation:
    *Out = ( A . S') + (B . S)*
- Fill in the LHS and RHS of the assignment accordingly keeping in mind what value should be assigned to whom.
- The assignment operator must be selected as '=' and not '<=' because for a sequential storage behaviour, we always need to select the non-blocking assignment operator (<=) and for a combinational logic, we use (=).

### Verilog Test Bench -

- The code block that defines test bench name should be placed first, followed by the code block that declares input, output registers and wires, then the block that instantiates the MUX module, then the blocks that defines the input waves and finally the end of module block.
- Drag and drop the code blocks to arrange them in the order mentioned above.
- Now enter a name for the verilog test bench. Make sure that the name begins with alphabets and can only include alphanumeric characters and '_' character without any spaces or other special characters in between and it does not match with the verilog module name you have entered earlier.
- Then declare A, B and S as registers and Out as a wire.
- Now instantiate the MUX module by entering the name of the verilog module you have earlier coded. Select the arguments in the same order as you have chosen in the module. The order in which you give the arguments here, the inputs and outputs will be used in the same order in the module. For example, you give arguments in the module instantiation in the test bench in the order A, S, Out, B then the inputs of the module will become A, S, Out and the output will become B which is not desired.

## Observations -

- On clicking "validate" option after completing the code (assuming everything is filled correctly) you should see a "Success" message and a truth table under the observations section.
- Observe the fluctuations in input wave and the corresponding expected and observed output.
