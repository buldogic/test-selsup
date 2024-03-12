import { Component, ChangeEvent } from 'react'
import './App.css'

interface Param {
	id: number
	name: string
	type: string
}

interface ParamValue {
	paramId: number
	value: string
}

interface Model {
	paramValues: ParamValue[]
	colors: string[]
}

interface Props {
	params: Param[]
	model: Model
}

interface State {
	paramValues: ParamValue[]
}

class ParamEditor extends Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			paramValues: this.initializeParamValues(),
		}
	}

	initializeParamValues(): ParamValue[] {
		return this.props.model.paramValues.map((paramValue) => ({
			paramId: paramValue.paramId,
			value: paramValue.value,
		}))
	}

	handleParamChange = (
		paramId: number,
		event: ChangeEvent<HTMLInputElement>
	) => {
		const { value } = event.target
		this.setState((prevState) => ({
			paramValues: prevState.paramValues.map((paramValue) =>
				paramValue.paramId === paramId ? { ...paramValue, value } : paramValue
			),
		}))
	}

	public getModel(): Model {
		return {
			paramValues: this.state.paramValues,
			colors: this.props.model.colors,
		}
	}

	render() {
		const { params } = this.props

		return (
			<div>
				{params.map((param) => (
					<div key={param.id} className="container">
						<label>{param.name}</label>
						<input
							type="text"
							value={
								this.state.paramValues.find((p) => p.paramId === param.id)
									?.value || ''
							}
							onChange={(e) => this.handleParamChange(param.id, e)}
						/>
					</div>
				))}
			</div>
		)
	}
}

function App() {
	const params: Param[] = [
		{ id: 1, name: 'Назначение', type: 'string' },
		{ id: 2, name: 'Длина', type: 'string' },
	]

	const model: Model = {
		paramValues: [
			{ paramId: 1, value: 'повседневное' },
			{ paramId: 2, value: 'макси' },
		],
		colors: ['Red', 'Green', 'Blue'],
	}

	return <ParamEditor params={params} model={model} />
}

export default App
