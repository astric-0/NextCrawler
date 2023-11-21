function nameBuilder(nameArr, extension = "") {
	return nameArr.reduce((value, curr) => value + "_" + curr) + extension;
}

export default nameBuilder;
