import { NextResponse } from 'next/server';

export function successResponse<T>(
  data: T,
  message: string = 'Success',
  status: number = 200
) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

export function errorResponse(
  message: string,
  error?: unknown,
  status: number = 500
) {
  let errorMessage = error;

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  return NextResponse.json(
    {
      success: false,
      message,
      ...(errorMessage ? { error: errorMessage } : {}),
    },
    { status }
  );
}

export function validationErrorResponse(errors: unknown) {
  return NextResponse.json(
    {
      success: false,
      message: 'Validation failed',
      errors,
    },
    { status: 400 }
  );
}
